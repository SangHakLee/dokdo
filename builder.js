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
    return class extends BuilderBase {
        constructor(...args) {
            super();
            this.Class = BaseClass;
            // BaseClass의 인스턴스를 생성하여 기본 프로퍼티를 가져옴
            const instance = new BaseClass({});

            Object.keys(instance).forEach(prop => {
                this[prop] = undefined;
                this[prop] = function(value) {
                    this[`${prop}`] = value;
                    return this;
                };
            });

            if (args.length > 0 && typeof args[0] !== 'object') {
                // 개별 인자들을 통한 초기화
                const props = Object.keys(instance);
                props.forEach((prop, index) => {
                    this[prop](args[index]);
                });
            } else if (args.length === 1 && typeof args[0] === 'object') {
                // 빌더 패턴을 통한 초기화
                const builder = args[0];
                Object.keys(builder).forEach(prop => {
                    this[prop](builder[prop]);
                });
            }
        }

        static get Builder() {
            return this;
        }
    };
}

module.exports = {
    Builder
};
