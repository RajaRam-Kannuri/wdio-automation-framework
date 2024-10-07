rmdir reports /q /s
rmdir allure-Report /q /s
#set baseUrl=https://acm-general-web-stg.pink.cat/tv
set baseUrl=https://astro.com.my
call npm run test:app
node_modules\.bin\allure generate reports -o allure-Report --clean