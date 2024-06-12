const { Builder } = require('../builder');

class User extends Builder(class {
    constructor(builder = {}) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.money = builder.money;
    }

    getName() {
        return `${this.firstName}, ${this.lastName}`
    }

    static dummy() {
        return "dummy";
    }
}) {}

test("Builder", () => {
    const user = new User.Builder()
        .firstName('sanghak')
        .lastName('lee')
        .email('code.ryan.lee@gmail.com')
        .money(1000000000)
        .build();

    expect(user.firstName).toBe('sanghak');
    expect(user.lastName).toBe('lee');
    expect(user.email).toBe('code.ryan.lee@gmail.com');
    expect(user.money).toBe(1000000000);

    expect(user.getName()).toBe('sanghak, lee');
    expect(User.dummy()).toBe('dummy');
});

test("Builder with undefined member", () => {
    const user = new User.Builder()
        .firstName('sanghak')
        .email('code.ryan.lee@gmail.com')
        .money(1000000000)
        .build();

    expect(user.firstName).toBe('sanghak');
    expect(user.lastName).toBe(undefined);
    expect(user.email).toBe('code.ryan.lee@gmail.com');
    expect(user.money).toBe(1000000000);
    expect(user.getName()).toBe('sanghak, undefined');
});

test("constructor", () => {
    const user = new User('sanghak', 'lee', 'code.ryan.lee@gmail.com', 1000000000);

    expect(user.firstName).toBe('sanghak');
    expect(user.lastName).toBe('lee');
    expect(user.email).toBe('code.ryan.lee@gmail.com');
    expect(user.money).toBe(1000000000);
    expect(user.getName()).toBe('sanghak, lee');
});

test("named constructor", () => {
    const user = new User({
        firstName: 'sanghak',
        lastName: 'lee',
        email: 'code.ryan.lee@gmail.com',
        money: 1000000000
    });

    expect(user.firstName).toBe('sanghak');
    expect(user.lastName).toBe('lee');
    expect(user.email).toBe('code.ryan.lee@gmail.com');
    expect(user.money).toBe(1000000000);
    expect(user.getName()).toBe('sanghak, lee');
});

test("named constructor with undefined member", () => {
    const user = new User({
        firstName: 'sanghak',
        email: 'code.ryan.lee@gmail.com',
        money: 1000000000
    });

    expect(user.firstName).toBe('sanghak');
    expect(user.lastName).toBe(undefined);
    expect(user.email).toBe('code.ryan.lee@gmail.com');
    expect(user.money).toBe(1000000000);
    expect(user.getName()).toBe('sanghak, undefined');
});
