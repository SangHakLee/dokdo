# Javascript class builder
> like [lombok](https://projectlombok.org)
 
```javascript
const { Builder } = require('@sanghak/dokdo');

class User extends Builder(class {
    constructor(builder = {}) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.money = builder.money;
    }
}) {}


const user = new User.Builder()
    .firstName('sanghak')
    .lastName('lee')
    .email('code.ryan.lee@gmail.com')
    .money(1000000000)
    .build();
```