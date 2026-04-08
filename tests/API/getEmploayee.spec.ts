import { test, expect} from "@playwright/test"



 const cookies = 'orangehrm=j0nlu0da90vhsjf0q7e7lcjg8k'
test('Get employee', async ({ request }) => {
    const employee = await request.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/employment-statuses?limit=0', {
        headers: {
            Cookie: cookies
        }
    })
    expect(employee.status()).toBe(200)
    const jsonResponse = await employee.json();

    console.log(jsonResponse);
})

test('create employee',async({request})=>{
    const createEmp = await request.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',{
          headers: {
            Cookie: cookies,
        
        },
        data:{
            "empNumber": 259,
            "lastName": "Prasad",
            "firstName": "Maruthi",
            "middleName": "Prueba",
            "employeeId": "349",
            "terminationId": null
        },
         
    })
    
})