export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1000',
                dob: 'f230fh0g3',
                name: 'Bamboo Watch',
                image: 'bamboo-watch.jpg',
                gender: 65,
                idNumber: 'Accessories',
                email: 5,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1001',
                dob: 'nvklal433',
                name: 'Black Watch',
                description: 'Product Description',
                image: 'black-watch.jpg',
                gender: 72,
                idNumber: 'Accessories',
                quantity: 61,
                inventoryStatus: 'INSTOCK',
                email: 4,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1002',
                dob: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Product Description',
                image: 'blue-band.jpg',
                gender: 79,
                idNumber: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                email: 3,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1003',
                dob: '244wgerg2',
                name: 'Blue T-Shirt',
                description: 'Product Description',
                image: 'blue-t-shirt.jpg',
                gender: 29,
                idNumber: 'Clothing',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                email: 5,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1004',
                dob: 'h456wer53',
                name: 'Bracelet',
                description: 'Product Description',
                image: 'bracelet.jpg',
                gender: 15,
                idNumber: 'Accessories',
                quantity: 73,
                inventoryStatus: 'INSTOCK',
                email: 4,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1005',
                dob: 'av2231fwg',
                name: 'Brown Purse',
                description: 'Product Description',
                image: 'brown-purse.jpg',
                gender: 120,
                idNumber: 'Accessories',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                email: 4,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1006',
                dob: 'bib36pfvm',
                name: 'Chakra Bracelet',
                description: 'Product Description',
                image: 'chakra-bracelet.jpg',
                gender: 32,
                idNumber: 'Accessories',
                quantity: 5,
                inventoryStatus: 'LOWSTOCK',
                email: 3,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1007',
                dob: 'mbvjkgip5',
                name: 'Galaxy Earrings',
                description: 'Product Description',
                image: 'galaxy-earrings.jpg',
                gender: 34,
                idNumber: 'Accessories',
                quantity: 23,
                inventoryStatus: 'INSTOCK',
                email: 5,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1008',
                dob: 'vbb124btr',
                name: 'Game Controller',
                description: 'Product Description',
                image: 'game-controller.jpg',
                gender: 99,
                idNumber: 'Electronics',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                email: 4,
                address: 'HN',
                phone: '01235'
            },
            {
                id: '1009',
                dob: 'cm230f032',
                name: 'Gaming Set',
                description: 'Product Description',
                image: 'gaming-set.jpg',
                gender: 299,
                idNumber: 'Electronics',
                quantity: 63,
                inventoryStatus: 'INSTOCK',
                email: 3,
                address: 'HN',
                phone: '01235'
            },
           
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

