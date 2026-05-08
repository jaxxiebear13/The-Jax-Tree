addLayer("r", {
    name: "reset", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c5c5c5",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "reset points", // Name of reset currency
    baseResource: "points", // Name of resource reset is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Reset currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('r', 24)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for reset points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "A New Tree Games!",
            description: "Generate points, if you like points",
            cost: new Decimal(1),
        },
        12: {
            title: "Pointer",
            description: "+1 point gain",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('r', 11) }
        },
        13: {
            title: "Nothing",
            description: "+0 point gain :D",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('r', 12) }
        },
        14: {
            title: "PointerS",
            description: "x2 points gain",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade('r', 13) }
        },
        15: {
            title: "Pointest",
            description: "+1 point gain",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade('r', 14) }
        },
        21: {
            title: "A New Row",
            description: "+0.01 point gain",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('r', 15) }
        },
        22: {
            title: "Generatorless",
            description: "+1 point gain, but sadly you can't play Generator Incremental",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('r', 21) }
        },
        23: {
            title: "Making Points",
            description: "x2 points gain, again",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade('r', 22) }
        },
        24: {
            title: "Reset Point Stocks",
            description: "x2 reset points.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade('r', 23) },
        }
    },
    layerShown(){return true}
})

addLayer("ach", {
    name: "Achievements",
    symbol: "A",
    position: 0,
    row: "side",
    layerShown() { return true },
    
    achievements: {
        11: {
            name: "Reset",
            tooltip: "Reset once.",
            done() { return player.r.points.gte(1) },
        },
        12: {
            name: "Pointing",
            tooltip: "Get 1K points.",
            done() { return player.points.gte(1000) },
        },
    },
})

