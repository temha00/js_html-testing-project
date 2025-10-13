using db_lib;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ConsoleApp
{
    public class LocalItem
    {
        public int pk_id;
        public string kurzbez;

    }
    public class MainApp
    {
        private static string connstr
        {
            get
            {
                var pass = File.ReadAllText("C:\\creds\\postgresql_pass.txt");
                // var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
                // var connstr = @"Server=localhost\SQLEXPRESS;Database=MYPROJ_CONTACT01;Trusted_Connection=True;TrustServerCertificate=True;";
                var connstr = @$"Server=localhost\SQLEXPRESS;Database=MYPROJ_WEBDATA01;User Id=galaxy;Password={pass};TrustServerCertificate=True";
                return connstr;
            }
        }

        public static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");

            using (var _db = new MyDbContext(connstr))
            {
                // var query = _db.artikels.Take(3);
                // string sql = query.ToQueryString();
                // var recs = query.Take(3).ToList();
                // var json = JsonConvert.SerializeObject(recs, Formatting.Indented);
                // Console.WriteLine(sql);
                // Console.WriteLine(json);

                var query = _db.kontaktes.AsQueryable();
                query = query.Take(3);

                var query2 = query.Select(x => new LocalItem { pk_id = x.pk_contact, kurzbez = x.kurzbez });
                add_params(query2);

                var sql = query2.ToQueryString();
                Console.WriteLine(sql);
                var recs = query2.ToList();



                var json2 = JsonConvert.SerializeObject(recs, Formatting.Indented);
                Console.WriteLine(json2);


            }
            // Console.Write("your input: ");
            // var inpt = Console.ReadLine();
            // Console.WriteLine("you wrote " + inpt);
            // Console.WriteLine("bye");

        }
        public static IQueryable<LocalItem> add_params(IQueryable<LocalItem> query2)
        {
            query2 = query2.Take(3);
            query2 = query2.OrderBy(x => x.kurzbez);

            return query2;
        }
    }
}

