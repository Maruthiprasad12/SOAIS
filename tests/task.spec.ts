import{test,expect, Locator} from '@playwright/test';
test('Check-In and Check out ',async({page})=>{
    test.setTimeout(60000);
 
    await page.goto("https://www.booking.com/");
 
    //Click on the date picker to open calendar
    await page.getByTestId("searchbox-dates-container").click();
   
   
    //Select the check-in date
    let checkInmonth="June";
    let checkInyear="2026";
    let checkIndate="15";
   
    //Navigate to the desired month and year
    while(true){
        const checkInMonthYear=await page.locator('#calendar-searchboxdatepicker>div>div>div>div>h3').first().innerText();
        const currMonth=checkInMonthYear.split(" ")[0];
        const currYear=checkInMonthYear.split(" ")[1];
       
        if(currMonth===checkInmonth && currYear===checkInyear){
            break;
        }
        await page.locator('button[data-testid="calendar-next-month-button"]').click();
 
    }
    //Select the target date
    //let allDates=await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
    let allDates=await page.locator('table.b8fcb0c66a tbody tr td').all();
    let checkInDateSelected=false;
 
    for(let date of allDates){
        const dateText=await date.innerText();
        if(dateText===checkIndate){
            await date.click();
            checkInDateSelected=true;
            break;
        }
    }
 
    //Assertion to confirm that chack-in date was selected
    const checkInInputValue=await page.getByTestId("date-display-field-start").inputValue();
    expect(checkInInputValue).toBe("2026-06-15");
 
    //Select the check-out date
 
     let checkOutmonth="July";
    let checkOutyear="2026";
    let checkOutdate="20";
   
    //Navigate to the desired month and year
    while(true){
        const checkOutMonthYear=await page.locator('.bui-calendar__month').nth(1).innerText();
        const currMonth=checkOutMonthYear.split(" ")[0];
        const currYear=checkOutMonthYear.split(" ")[1];
       
        if(currMonth===checkOutmonth && currYear===checkOutyear){
            break;
        }
        await page.locator('button[data-testid="calendar-next-month-button"]').click();
 
    }
    //Select the target date
     allDates=await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
   // let allDates=await page.locator('table.b8fcb0c66a tbody tr td').all();
    let checkOutDateSelected=false;
 
    for(let date of allDates){
        const dateText=await date.innerText();
        if(dateText===checkOutdate){
            await date.click();
            checkOutDateSelected=true;
            break;
        }
    }
 
    //Assertion to confirm that check-out date was selected
    const checkOutInputValue=await page.getByTestId("date-display-field-end").inputValue();
    expect(checkOutInputValue).toBe("2026-07-20");
 
})