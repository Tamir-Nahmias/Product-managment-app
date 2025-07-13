
using ProductManagementApp.Model; 
using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Config;
namespace ProductManagementApp.Repository;
// the product repository layer to read/write directly to/from DB is being
// executed with dependency injections and its EFs linq quering
public class ProductRepo
{
    private readonly AppDbContext _context;

    public ProductRepo(AppDbContext context)
    {
        _context = context;
    }

    // CREATE - ADD
    public async Task<Product> AddProductAsync(Product product)
    {
        _context.Set<Product>().Add(product);
        await _context.SaveChangesAsync();
        return product;
    }
    // READ - RETREIVE

    public async Task<List<Product>> GetAllProductsAsync()
    {
        return await _context.Set<Product>().ToListAsync();
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _context.Set<Product>().FirstOrDefaultAsync((product) => product.Id == id);
    }

    //DELTE - REMOVE

    public async Task<bool> DeleteProductAsync(int id)
    {
        var result = await this._context.Products
        .Where(Product => Product.Id == id)
        .ExecuteDeleteAsync();

        return result > 0;
    }
    //PUT- UPDATE
    public async Task<bool> UpdateProductAsync(int id, Product updatedProduct)
    {
        var currentProduct = await this.GetProductByIdAsync(id);
        if (currentProduct == null)
        {
            return false;
        }
        currentProduct.Name = updatedProduct.Name;
        currentProduct.Price = updatedProduct.Price;
        currentProduct.Description = updatedProduct.Description;
        currentProduct.Image = updatedProduct.Image;
        currentProduct.IsSellable = updatedProduct.IsSellable;
        currentProduct.ItemsInStock = updatedProduct.ItemsInStock;

        await _context.SaveChangesAsync();

        return true;
    }


}
