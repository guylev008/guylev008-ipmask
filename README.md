# ipmask

Also see: https://github.com/nucleardreamer/netrange

useful for IPv4-based neighbor discovery on a subnet. ~~get the subnet ifconfig
netmask.~~ get the public IPv4 interface, including the mac addr and netmask

# Install
```bash
$ npm i @guylev008/ipmask
```

## Usage simple example

```jsx
const ipMask = require('@guylev008/ipmask');

ipMask.mask('198.168.4.98');
```

### Params:

#### text (required) - string
The text which contains IP addresses.


