if(Backpack.mixins) {
    for(var i in Backpack.mixins) {
        Backpack[i] = Backpack.mixins[i];
    }
}

Backpack.init();
