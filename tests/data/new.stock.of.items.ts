export type newItemsFormat = {
    productName: string;
    price: number;
    quantity: number;
}[];


export const newStockOfItems: newItemsFormat = [

    { productName: 'Wireless Mouse with wire', 
      price: 25, 
      quantity: 50 
    },
    { productName: 'Keyboard with no keys', 
      price: 80, 
      quantity: 30 
    },
    { productName: 'HD Monitor with 2 inch display', 
      price: 150, 
      quantity: 20 
    },
    { productName: 'USB-C Hub for iPhones', 
      price: 40, 
      quantity: 60 
    },
    { productName: 'Extatrestrial Hard Drive', 
      price: 100, 
      quantity: 25 
    },
];

export const newItemIds: number[] = [8, 9, 10, 11, 12];