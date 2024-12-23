# React Module 1

## Project: e-shop

### User Login Credentials 🔐

| Role      | Username | Password |
|-----------|----------|----------|
| **Admin** | a@a.a    | password |
| **User1** | b@b.com  | password |
| **User2** | c@c.com  | password |

### Project details: 🏠

Table BD:

1. users: id / login / password / role(id)
2. roles: id / name
3. product: id / category(id) / name / price/ quantity/ units / description / imageUrl / comments[(id)]
4. cart: id / user(id) / products[(id)]/ totalPrice / productsPrice / shipmentPrice
5. order: id / user(id) / cart(id) / address[(id)]
6. address: id / user(id) / name/ lastName / phone / country / address /
7. category: id / name / imageUrl
8. comments: id / product(id) / author(id) content

Schema for redux store:

1. app: isLogout / isLogin / isOrders /isRegistered / isCart / modal :{ isOpen, text, onConfirm(), onCancel}
2. user: id / login / roleId / cartId / session
3. products[{ id / category:{ id, name } / imageUrl / price / quantity / description / unit / comments([id])}]:
    - page: a current number of page
    - totalPages
    - totalProducts
4. product(edit/show/addCart):  id / category:{ id, name } / imageUrl / price / quantity / description / unit /
   comments([id])
5. orders[{ orderId, userLogin, totalPrice, shipmentPrice, createdAt}]
6. categories[{id, name, imageUrl}]

#### [home]

![home](frontend/src/access/readme/home.jpg)

#### [catalog]

![catalog](frontend/src/access/readme/catalog.jpg)

#### [product]

![product](frontend/src/access/readme/product.jpg)

#### [registration]

![registration](frontend/src/access/readme/registration.jpg)

#### [login]

![login](frontend/src/access/readme/login.jpg)

#### [header-user]

![header-user](frontend/src/access/readme/header-user.jpg)

#### [cart]

![cart](frontend/src/access/readme/cart.jpg)

#### [order]

![order](frontend/src/access/readme/order.jpg)

#### [orders]

![orders](frontend/src/access/readme/orders.jpg)

#### [header-admin]

![header-admin](frontend/src/access/readme/header-admin.jpg)

#### [admin-remove-comment]

![admin-remove-comment](frontend/src/access/readme/admin-remove-comment.jpg)

#### [admin-users]

![admin-users](frontend/src/access/readme/admin-users.jpg)

#### [admin-manager-products]

![admin-manager-products](frontend/src/access/readme/admin-manager-products.jpg)

#### [admin-search]

![admin-search](frontend/src/access/readme/admin-search.jpg)

#### [admin-add-category]

![admin-add-category](frontend/src/access/readme/admin-add-category.jpg)

#### [tooltip]

![tooltip](frontend/src/access/readme/tooltip.jpg)

#### [alert-error]

![error](frontend/src/access/readme/error.jpg)









