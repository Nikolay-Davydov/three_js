
//класс для хранения данных о товаре со свойствами
class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;        
    }
    setAvailable() {
        return this.available = true;
    }
}

//класс для хранения каталога товаров со свойствами
class GoodsList {
    #goods = []      // массив экземпляров объектов класса Good (приватное поле)
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    //возвращает массив доступных для продажи товаров, 
    //в соответствии с установленным фильтром и сортировкой по полю Price
    get list(){                 // ----------------  Не сделано!     -----------
        let productList = this.#goods.filter(good => this.filter.test(good.name));
        if(!this.sortPrice) {
            return productList;
        }
        if (this.sortDir) {
            return productList.sort((x, y) => (x.price - y.price));
        }
        return productList.sort((x, y) => (y.price - x.price));

    }

    //добавление товара в каталог                
    add(newGood) {
        this.#goods.push(newGood);
        let result = this.#goods;
        return result;
    }

    // Удаление товара из каталога по его id
    remove(id) {
        let delProduct = this.#goods.findIndex(good => good.id === id);
        if (delProduct != undefined) {
            this.#goods.splice(delProduct, 1);
        }
        return delProduct
    }

    // Фильтр наличия
    filterAvailable () {
        const result = this.#goods.filter(good => good.available === true)
        return result;
    }
}

// Класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством
class BasketGood extends Good {
    constructor(currentGood, amount) {
        super(currentGood);
        this.amount = amount;
        this.id = currentGood.id;
        this.name = currentGood.name;
        this.sizes = currentGood.sizes;
        this.price = currentGood.price;
        this.available = currentGood.available;
    }
}
// Класс для хранения данных о корзине товаров со свойствами
class Basket {
    constructor() {
        this.goods = [];
    }
    // Возвращает общюю стоимость товаров в корзине
    get totalAmount() {
        let allProducts = this.goods.reduce(function(totalSum, good) {
            return totalSum + good.amount}, 0);
        return allProducts
    }

    // Возвращает общее количество товаров в корзине
    get totalSum() {
        let allPrice = this.goods.reduce(function(totalAmount, good){
            return totalAmount + good.amount * good.price;}, 0)
        return allPrice

    }

    // Метод add(good, amount) добавляет товар в корзину, если товар уже есть увеличивает количество.
    add (good, amount) {
        // Проверка на integer
        if (!(typeof amount === "number")) {
          throw new Error("Введите количество");
        }
        if (amount < 0) {this.remove(good, amount)
        }
        else {
        let trigger = false
        for (let index = 0; index < this.goods.length; index++) {
            if (this.goods[index].id === good.id) {
                this.goods[index].amount = this.goods[index].amount + amount
                trigger = true
                break
            }
        }
        if (trigger === false) {
            this.goods.push(good)
            } 
        }
    }

    // Метод remove(good, amount) Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            }
            else {
                this.goods[index].amount -= amount;
            }
        }
    }

    // Метод clear() Очищает содержимое корзины
    clear () {
        this.goods.splice(0, this.goods.length)
    }

    // Метод removeUnavailable() Удаляет из корзины товары, имеющие признак available === false
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true);
        return this.goods;
    }
}

// В основном коде программы создайте не менее 5 экземпляров класса Good.
const good1 = new Good(1, 'Кросовки', 'Беговые кросовки', ['S', 'M', 'L'], 2500, false);
const good2 = new Good(2, 'Шорты', 'Пляжные шорты', ['XS', 'L', 'XXL'], 500, true);
const good3 = new Good(3, 'Футболка', 'Полиэстер 100%', ['M', 'L', 'XL'], 1000, true);
const good4 = new Good(4, 'Скальные туфли', 'Для боулдеринга', ['41', '42', '44.5'], 4000, true);
const good5 = new Good(5, 'Пуховик', 'Наполнитель гуссинный пух', ['46', '52', '56'], 35000, true);

// Создание массива экземпляров товаров
const goodsAll = [];
goodsAll.push(good1);
goodsAll.push(good2);
goodsAll.push(good3);
goodsAll.push(good4);

// Фильтр
const newCatalog = new GoodsList(goodsAll, /Шорты/i, true, true);

// Экземпляр товара для корзины
const newBasketGood1 = new BasketGood(good1, 3);
const newBasketGood2 = new BasketGood(good2, 5);
const newBasketGood3 = new BasketGood(good3, 2);
const newBasketGood4 = new BasketGood(good4, 7);
// console.log(newBasketGood1)

//Создание экземпляра корзины
const newBasket = new Basket();


// ТЕСТОВЫ ТОВАРОВ

// функция setAvailable
// good2.setAvailable();
// console.log(good2.available);

// Функция возвращает массив доступных для продажи товаров, в соответствии с установленным фильтром и сортировкой по полю Price
// console.log(newCatalog.list);

// Функция добавляет товар в корзину, если товар уже есть увеличивает количество.
// console.log(newCatalog.add(good5));

// Функция удаление товара из каталога по id
// console.log(newCatalog.remove(undefined));

// Функция с фильтром доступности
// console.log(newCatalog.filterAvailable());


// ТЕСТОВЫ КОРЗИНЫ

newBasket.add(newBasketGood3, newBasketGood3.amount);
// console.log(newBasket);

newBasket.add(newBasketGood3, 10);
// console.log(newBasket)

// Общее количество
// console.log(`Общее количество товаров в корзине: `, newBasket.totalAmount);
// console.log(`Общая сумма в корзине: `, newBasket.totalSum);

// Очистка корзины
// newBasket.clear();
// console.log(newBasket);

// Цдаление из корзины товара по available === false
// newBasket.removeUnavailable();
// console.log(newBasketGood1.amount);













