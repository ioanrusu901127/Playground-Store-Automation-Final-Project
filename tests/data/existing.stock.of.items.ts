export type defaultStickOfItemsFormat = {
    name: string;
    price: number;
    quantity: number;
    itemId: number;
}[];

export const existingStockOfItems: defaultStickOfItemsFormat = [
    {
        name: "Lightsaber (Star Wars)",
        price: 9999.99,
        quantity: 2,
        itemId: 0
    }, {
        name: "Giant Rubber Duck",
        price: 49.99,
        quantity: 15,
        itemId: 1
        }, 
        {
        name: "Shark Repellent",
        price: 299.99,
        quantity: 5,
        itemId: 2
        }, 
        {
        name: "Aluminum Helmet for Protection Against Alien Mind Control",
        price: 19.99,
        quantity: 50,
        itemId: 3
        },
        {
        name: "Sonic Screwdriver (Doctor Who)",
        price: 79.99,
        quantity: 7,
        itemId: 4
        }, 
        {
        name: "Bacon-Scented Candle",
        price: 14.99,
        quantity: 20,
        itemId: 5
        }, 
        {
        name: "Invisible Pen",
        price: 9.99,
        quantity: 0,
        itemId: 6
        }, 
        {
        name: "Dog Sunglasses",
        price: 24.99,
        quantity: 12,
        itemId: 7
        }
];