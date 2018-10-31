## Magic Mirror CLI
You can Create and Develop your own Module for Mirror just by command line interface like below,
First you need `link` this `cli` to global then use `smir` prefix with Available command to `CRUD` moduls.

```bash
# install dependencies
npm install

# First Of all install magic mirror cli
cd .\windows\

# link cli to Global
npm link

# now you have access magic mirro :
smir
```

<img src="./assets/img/Demo-0.gif">

### Available Command:
List of available command thats gives you ability create CROUD module and its own properties settings.

```bash
# Creat a Module base on moduleName and moduleDisplayName
smir creat

# Remove a Module base on list of modules
smir remove

# Add a New Proprety to Module
smir aprop

# Remove a Proprety From Module
smir rprop
```
<img src="./assets/img/Demo-1.gif">
