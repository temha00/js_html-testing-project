namespace CmdApp;

public static class CmmFuncs
{
    public static string connstr()
    {
        var pass = File.ReadAllText("C:\\creds\\postgresql_pass.txt");
        // var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
        // var connstr = @"Server=localhost\SQLEXPRESS;Database=MYPROJ_CONTACT01;Trusted_Connection=True;TrustServerCertificate=True;";
        var connstr = @$"Server=localhost\SQLEXPRESS;Database=MYPROJ_WEBDATA01;User Id=galaxy;Password={pass};TrustServerCertificate=True";
        return connstr;
    }
}
