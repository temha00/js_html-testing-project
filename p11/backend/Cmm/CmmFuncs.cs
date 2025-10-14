namespace Cmm;

public static class CmmFuncs
{
    public static string CmmConnstr()
    {
        var pass = File.ReadAllText("C:\\creds\\connstr..txt");
        // var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
        // var connstr = @"Server=localhost\SQLEXPRESS;Database=MYPROJ_CONTACT01;Trusted_Connection=True;TrustServerCertificate=True;";
        var connstr = pass;
        return connstr;

    }
}
