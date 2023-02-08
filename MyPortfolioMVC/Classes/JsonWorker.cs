namespace MyPortfolioMVC.Classes
{
    public class JsonWorker<T>
    {
        public T ReadJsonFromFile(string path)
        {
			try
			{
				return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(System.IO.File.ReadAllText(path));
			}
			catch (System.Exception err)
			{
				throw err;
			}
        }
    }
}
