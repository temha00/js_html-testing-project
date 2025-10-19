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

        var resultFldnames = fldnames.ToString();
        var resultFlddatas = flddatas.ToString();

        var sqlString = $"insert into {table} ({resultFldnames}) values ({resultFlddatas})";
        return sqlString;
    }

    public string GetUpdateSql(string table, int id)
    {
        var updateString = new StringBuilder();
        var i = 0;

        foreach(item item in items)
        {
            updateString.Append(item.fldname);

            updateString.Append('=');

            updateString.Append('\'');
            updateString.Append(item.flddata);
            updateString.Append('\'');

            if (i < items.Count - 1)
            {
                updateString.Append(',');
            }

            i++;
        }

        var resultString = updateString.ToString();
        var sqlString = $"update {table} set {resultString} where pk_id = {id}";

        return sqlString;
    }

    public string GetDeleteSql(string table, int id)
    {
        var sqlString = $"delete from {table} where pk_id = {id}";
        return sqlString;
    }
}
