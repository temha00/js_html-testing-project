using db_lib;

namespace CmdApp.Progs.Test02_AhmetTest;

public class MainClass
{
    public void Execute()
    {
        using (var _db = new _DbContext(CmmFuncs.CmmConnstr()))
        {
            var comp = new company();
            comp.company_name = "aaa";
            _db.companies.Add(comp);
            _db.SaveChanges();
        }

        Console.WriteLine("done!");
    }
}
