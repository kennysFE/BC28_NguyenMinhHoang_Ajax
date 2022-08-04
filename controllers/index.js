
// get full product 

let getFullProduct = () => {
    let promises = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
        responseType: 'json',
    });

    promises.then((result) => {
        // console.log(result.data);
        renderTableProduct(result.data);
    });
    promises.catch((err) => {
        console.log(err.response.data)
    });
}


//render table product
let renderTableProduct = (arrProduct) => {
    let htmlContent = '';
    for (let product of arrProduct) {
        htmlContent += `<tr>
             <td>${product.id}</td>
             <td><img src="${product.img}" alt="ảnh" class="w-50"/></td>
             <td>${product.name}</td>
             <td>${product.price}</td>
             <td>${product.description}</td>
             <td>${product.type}</td>
             <td class="d-flex  align-items-center">
                <button class="btn btn-danger p-2" onclick=(deleProduct('${product.id}'))><i class="fa fa-trash"></i></button>
                <button class="btn btn-primary p-2" onclick=(updateProduct('${product.id}'))><i class="fa fa-pencil-square-o"></i></button>
            </td>
        </tr>`

    }
    document.querySelector('#tableProduct').innerHTML = htmlContent;
}

//delete product
let deleProduct = (productID) => {
    alert('product id:',productID);
    let promises = axios({
        url: `http://svcy.myclass.vn/api/Product/DeleteProduct/${productID}`,
        method: 'DELETE',
    });
    promises.then((results) => {
        console.log(results);
        getFullProduct();
    })
    promises.catch((err) => {
        console.log(err.response.data)
    })
}

//update Product
let updateProduct = (productID) => {
    //get Product by id
    let promises = axios({
        url: `http://svcy.myclass.vn/api/Product/GetById/${productID}`,
        method: 'GET',
    })

    promises.then((result) => {
        let prod = result.data;
        console.log(prod);
        document.querySelector('#inputID').value= prod.id;
        document.querySelector('#inputName').value=prod.name;
        document.querySelector('#inputPrice').value=prod.price;
        document.querySelector('#inputImage').value=prod.img;
        document.querySelector('#inputDesPrice').value=prod.description;
        document.querySelector('#inputProType').value=prod.type;
    })
    promises.catch(function (err) { console.log(err.response.data) })
}

document.querySelector('#updateProduct').onclick=(event)=>{
    event.preventDefault();
    let prod= new Product();
    let arrTagInput = document.querySelectorAll('.form-row .form-group input');
    let i=0;
    for (let key in prod) {
       prod[key] =arrTagInput[i].value;
       i++;
    }
    let promises = axios({
        url:`http://svcy.myclass.vn/api/Product/UpdateProduct/${prod.id}`,
        method:'PUT',
        data:prod
    }) 

    promises.then(() => {
       getFullProduct();
    })
    promises.catch(function (err) { console.log(err.response.data) })
}



//create product
document.querySelector('#createProduct').onclick = (event) => {
    event.preventDefault();
    let prod = new Product();
    let arrTagInput = document.querySelectorAll('.form-row .form-group input');
    let i = 0;
    for (let key in prod) {
        prod[key] = arrTagInput[i].value;
        i++;
    }

    let promises = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: prod,
    })

    promises.then(() => {
        getFullProduct();
    })

    promises.catch((err) => {
        console.log(err.response.data);
    })

}


//search product

document.querySelector('#btnSearch').onclick=(e)=>{
   e.preventDefault();
   let inputSearch= document.querySelector('#inputSearch').value;

   let promises =axios({
      url:`http://svcy.myclass.vn/api/Product/SearchByName?name=${inputSearch}`,
      method:'GET', 
   })

   promises.then((result)=>{
    let arrProduct = result.data;
    console.log(arrProduct);
    renderTableProduct(arrProduct);
   })

   promises.catch((error)=>{
    console.log(error.response.data);
   })
}



window.onload = function () {
    getFullProduct();
}


