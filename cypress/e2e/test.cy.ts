const API_URL = Cypress.env('BURGER_API_URL');

Cypress.on('uncaught:exception', () => {
  return false;
});

beforeEach(() => {
  // localStorage and cookies
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  // ingredients
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/ingredients`
      },
      ingredients
    ).as('getIngredients');
  });

  // feed
  cy.fixture('orders.json').then((orders) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/orders/all`
      },
      orders
    ).as('getOrders');
  });

  // auth
  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/auth/user`
      },
      user
    ).as('getUser');
  });

  cy.visit('http://localhost:4000');
  cy.wait('@getIngredients');
});

describe('Проверка работоспособности приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', () => {});

  it('есть возможность добавлять булку и ингридиенты', () => {
    const bun = cy.get(`[data-cy=bun_0] button`);
    const ingredient = cy.get(`[data-cy=ingredient_0] button`);

    const noBunText1 = cy.get(`[data-cy=no_bun_text_1]`);
    const noBunText2 = cy.get(`[data-cy=no_bun_text_1]`);
    const noIngredientsText = cy.get(`[data-cy=no_ingredients_text]`);

    // Проверяем пустоту перед добавлением
    noBunText1.contains('Выберите булки');
    noBunText2.contains('Выберите булки');
    noIngredientsText.contains('Выберите начинку');

    bun.click();
    ingredient.click({ multiple: true });

    const constructionSection = cy.get(`[data-cy=constructor_section]`);
    constructionSection.contains('булка');
    cy.get(`[data-cy=ingredient_element]`);
  });

  it('проверка открытия и закрытия модального окна ингридиента', () => {
    const ingredient = cy.get(`[data-cy=bun_0]`);
    ingredient.click();

    cy.get(`[data-cy=ingredient_modal]`);
    cy.get(`[data-cy=close_modal_btn]`).click();
  });

  it('проверка нового заказа', () => {
    const bun = cy.get(`[data-cy=bun_0] button`);
    const ingredient = cy.get(`[data-cy=ingredient_0] button`);
    bun.click();
    ingredient.click({ multiple: true });

    cy.get(`[data-cy=new_order_total] button`).click();

    cy.fixture('newOrder.json').then((newOrder) => {
      cy.intercept(
        {
          method: 'POST',
          url: `${API_URL}/orders`
        },
        newOrder
      ).as('newOrder');

      cy.get(`[data-cy=new_order_number]`).contains(newOrder.order.number);
      cy.get(`[data-cy=close_modal_btn]`).click();

      // Проверяем пустоту после закрытия модалки
      const noBunText1 = cy.get(`[data-cy=no_bun_text_1]`);
      const noBunText2 = cy.get(`[data-cy=no_bun_text_1]`);
      const noIngredientsText = cy.get(`[data-cy=no_ingredients_text]`);
      noBunText1.contains('Выберите булки');
      noBunText2.contains('Выберите булки');
      noIngredientsText.contains('Выберите начинку');
    });
  });
});
