// builder.js
class BuilderBase {
    constructor() {
        if (new.target === BuilderBase) {
            throw new TypeError("Cannot construct BuilderBase instances directly");
        }
    }

    build() {
        return new this.Class(this);
    }
}

function Builder(BaseClass) {
    const BuilderClass = class extends BuilderBase {
        constructor(...args) {
            super();
            this.Class = BaseClass;
            // BaseClass의 인스턴스를 생성하여 기본 프로퍼티를 가져옴
            const instance = new BaseClass({});

            const expectedProps = Object.keys(instance);

            expectedProps.forEach(prop => {
                this[prop] = undefined;
                this[prop] = function(value) {
                    this[`__${prop}`] = value;
                    return this;
                };
            });

            if (args.length > 0 && typeof args[0] !== 'object') {
                // 기본 생성자를 통한 초기화
                const props = Object.keys(instance);
                props.forEach((prop, index) => {
                    this[prop] = args[index];
                });
            } else if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
                // object를 통한 초기화
                const namedParams = args[0];
                const isNamedParams = Object.keys(namedParams).every(key => expectedProps.includes(key));

                if (isNamedParams) {
                    Object.keys(instance).forEach(prop => {
                        if (prop in this) {
                            this[prop] = namedParams[prop];
                        }
                    });
                }
            }

        }

        build() {
            const instance = new this.Class({});
            Object.keys(this).forEach(prop => {
                if (prop.startsWith('__')) {
                    const key = prop.substring(2);
                    instance[key] = this[prop];
                } else if (typeof this[prop] !== 'function') {
                    instance[prop] = this[prop]; // undefined
                }
            });
            return instance;
        }

        static get Builder() {
            return this;
        }
    };

    // 원래 클래스의 정적 메소드를 BuilderClass에 복사합니다.
    Object.getOwnPropertyNames(BaseClass).forEach(name => {
        if (name !== 'prototype') {
            Object.defineProperty(BuilderClass, name, Object.getOwnPropertyDescriptor(BaseClass, name));
        }
    });

    return new Proxy(BuilderClass, {
        construct(target, args) {
            if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
                return new BaseClass(args[0]);
            } else if (args.length > 1) {
                const instance = new BaseClass({});
                const props = Object.keys(instance);
                props.forEach((prop, index) => {
                    if (index < args.length) {
                        instance[prop] = args[index];
                    }
                });
                return instance;
            }
            return Reflect.construct(target, args);
        }
    });
}

module.exports = {
    Builder
};
