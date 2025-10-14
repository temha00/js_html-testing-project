using db_lib;

namespace CmdApp.Progs.Test01_HalilTest
{
    public class MainClass
    {
        public void Execute()
        {

            var connstr = CmmFuncs.CmmConnstr();
            Console.WriteLine(connstr);

            using (var _db = new _DbContext(connstr))
            {
                var recs = _db.kontaktes.ToList();
                Console.WriteLine(recs.Count);
            }

            Console.WriteLine("done!");

        }

    }
}
