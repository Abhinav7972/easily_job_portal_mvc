export default class HomeController
{
    getHome(req,res)
    {
        res.sendFile('index.html')
    }
}