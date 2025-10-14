namespace Cmm;

public static class CmmHelper
{
    public static int ToInt32(string str)
    {
        if (str == null)
            return 0;

        return int.Parse(str);
    }
}
