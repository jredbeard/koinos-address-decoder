# Koinos Address Decoder

## Convert Base64 encoded addresses to Bitcoin-style ones

This is a simple script that takes in a Base64 encoded Koinos Address (often returned from contracts as addresses) and converts them into the familiar Bitcoin P2PKH format.

Usage:

```
node index.js
```

You will be prompted on the command line to enter the Base64 string to decode. You will get a Bitcoin-style Koinos address as output. That's it.

You can `npm install` if you want, but, it's not required as there are no external depenencies for this script. If you `npm install`, you can run it with `npm run koinos-address-decoder`.


