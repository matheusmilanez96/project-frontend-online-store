export async function getCategories() {
  // Implemente aqui
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  if (categoryId) {
    const requestCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const requestCategoryJson = await requestCategory.json();
    return requestCategoryJson;
  }
  const requestQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const requestQueryJson = await requestQuery.json();
  return requestQueryJson;
}

export async function getProductById(id) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const requestJson = await request.json();
  return requestJson;
}
