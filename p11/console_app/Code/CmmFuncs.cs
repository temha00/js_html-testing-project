namespace CmdApp;

public static class CmmFuncs
{
    public static string CmmConnstr()
    {
        var connstr = File.ReadAllText("C:\\creds\\connstr.txt");
        return connstr;
    }
}
