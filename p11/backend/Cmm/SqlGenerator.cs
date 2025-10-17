using System.Text;

namespace Cmm;

public class SqlGenerator
{
    List<object> items = new List<object>();

    public class item
    {
        public string? fldname;
        public string? flddata;
    }

    public void Add(string fldname, string flddata)
    {
        var item = new item();

        item.fldname = fldname;
        item.flddata = flddata;

        items.Add(item);
    }

    public string GetInsertSql(string table)
    {
        var fldnames = new StringBuilder();
        var flddatas = new StringBuilder();
        var i = 0;

        foreach (item item in items)
        {
            fldnames.Append(item.fldname);

            flddatas.Append('\'');
            flddatas.Append(item.flddata);
            flddatas.Append('\'');

            if (i < items.Count - 1)
            {
                fldnames.Append(',');
                flddatas.Append(',');
            }

            i++;
        }

        string resultFldnames = fldnames.ToString();
        string resultFlddatas = flddatas.ToString();

        var sqlString = $"insert into {table} ({resultFldnames}) values ({resultFlddatas})";
        return sqlString;
    }
}
