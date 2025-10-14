using db_lib;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CmdApp;

public class MainApp
{

    public static void Main(string[] args)
    {

        if (args.Length == 0)
        {
            Console.WriteLine("no arguments specified!");
            return;
        }

        var cmd = args[0];

        if (cmd == "t01")
        {
            new Progs.Test01_HalilTest.MainClass().Execute();
        }
        else if (cmd == "t02")
        {

        }


        Console.WriteLine(string.Join("/", args));

        var connstr = CmmFuncs.CmmConnstr();

        //using (var _db = new _DbContext(connstr))
        //{
        //    // var query = _db.artikels.Take(3);
        //    // string sql = query.ToQueryString();
        //    // var recs = query.Take(3).ToList();
        //    // var json = JsonConvert.SerializeObject(recs, Formatting.Indented);
        //    // Console.WriteLine(sql);
        //    // Console.WriteLine(json);

        //    var query = _db.kontaktes.AsQueryable();
        //    query = query.Take(3);

        //    var query2 = query.Select(x => new LocalItem { pk_id = x.pk_contact, kurzbez = x.kurzbez });
        //    add_params(query2);

        //    var sql = query2.ToQueryString();
        //    Console.WriteLine(sql);
        //    var recs = query2.ToList();



        //    var json2 = JsonConvert.SerializeObject(recs, Formatting.Indented);
        //    Console.WriteLine(json2);


        //}
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

