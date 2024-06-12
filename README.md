# Javascript class builder
> like [lombok](https://projectlombok.org)

![npm](https://img.shields.io/npm/v/@sanghak/dokdo)
![License](https://img.shields.io/github/license/sanghaklee/dokdo)

## Install
```bash
npm install @sanghak/dokdo
```
 
## usage
```javascript
const { Builder } = require('@sanghak/dokdo');

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


const user = new User.Builder()
    .firstName('sanghak')
    .lastName('lee')
    .email('code.ryan.lee@gmail.com')
    .money(1000000000)
    .build();
```

```javascript
const user = new User('sanghak', 'lee', 'code.ryan.lee@gmail.com', 1000000000);
```

```javascript
const user = new User({
    firstName: 'sanghak',
    lastName: 'lee',
    email: 'code.ryan.lee@gmail.com',
    money: 1000000000
});
```

```javascript
user.getName() // return "sanghak, lee"
User.dummy() // return "dummy"
```