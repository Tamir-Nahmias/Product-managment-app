using Microsoft.AspNetCore.Mvc;
using ProductManagementApp.Model;
using ProductManagementApp.Services;

[ApiController]

[Route("api/[controller]")] //"api/products"

public class ProductsController : ControllerBase
{
    private readonly ProductService _productServices;

    public ProductsController(ProductService productServices)
    {
        this._productServices = productServices;
    }

    //POST- ADD PRODUCT    
    [HttpPost]

    public async Task<IActionResult> AddProduct([FromBody] Product product)
    {
        try
        {
            var result = await _productServices.AddProduct(product);
            return StatusCode(201, new { messgae = "Product added succefuly" , result});
        }
        catch(Exception ex)
        {
            return StatusCode(500,new {error = "Something went wrong while trying to add product. check server", message = ex.Message });
        }
    }
    // GET ALL PRODUCTS
    [HttpGet]

    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var results = await _productServices.GetAllProducts();
            return StatusCode(200, results);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error : {ex.Message}");
            return StatusCode(501, "Error occured , couldn't retreive products . check Server connection ");
        }
    }

    //GET PRODUCT BY ID
    [HttpGet("{id}")]
    public async Task <IActionResult> GetProductById(int id)
    {
        try
        {
            var product = await _productServices.GetProductById(id);
            if (product == null)
                return NotFound(new { message = $"Product with id {id} was not found" });

            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Something went wrong while retrieving the product. check Server connection", message = ex.Message });
        }
    }

    //PUT 
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
    {
        try
        {
            var result = await _productServices.UpdateProduct(id, updatedProduct);
            if (!result)
                return StatusCode(404, new { message = $"Product with id {id} was not found" });

            return StatusCode(200, new { message = "Product updated successfully"});
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Something went wrong while updating the product", message= ex.Message });
        }
    }

     //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var result = await _productServices.DeleteProduct(id);
            if (!result)
                return StatusCode(404,new { message = $"Product with id {id} was not found" });

            return StatusCode(200,new { message = $"Product with id {id} deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Something went wrong while deleting the product" , message = ex.Message });
        }
    }
    

}