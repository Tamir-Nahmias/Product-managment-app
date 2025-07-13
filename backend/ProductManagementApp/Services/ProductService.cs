using ProductManagementApp.Model;
using ProductManagementApp.Repository;
// in products services there isn't a businnes logic services at all . 
// the methods are implemented stragiht forward . 
namespace ProductManagementApp.Services
{
    public class ProductService
    {
        private readonly ProductRepo _repository;

        public ProductService(ProductRepo repository)
        {
            this._repository = repository;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await this._repository.GetAllProductsAsync();
        }

        public async Task<Product?> GetProductById(int id)
        {
            return await this._repository.GetProductByIdAsync(id);
        }

        public async Task<Product> AddProduct(Product product)
        {
            return await this._repository.AddProductAsync(product);
        }

        public async Task<bool> DeleteProduct(int id)
        {
            return await this._repository.DeleteProductAsync(id);
        }

        public async Task<bool> UpdateProduct(int id, Product product)
        {
            return await this._repository.UpdateProductAsync(id, product);
        }
    }
}
