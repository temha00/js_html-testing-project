using System.Text;

namespace Cmm;

public class SqlGen
{
    List<object> sqlItems = new List<object>();

    public class sqlItem
    {
        public string? fldname;
        public string? flddata;
    }

    public void Add(string fldname, string flddata)
    {
        var item = new sqlItem();

        item.fldname = fldname;
        item.flddata = flddata;

        sqlItems.Add(item);
    }

    public string SqlInsert(string table)
    {
        var fldnames = new StringBuilder();
        var flddatas = new StringBuilder();
        var i = 0;

        foreach (sqlItem item in sqlItems)
        {
            fldnames.Append(item.fldname);

            flddatas.Append('\'');
            flddatas.Append(item.flddata);
            flddatas.Append('\'');

            if (i < sqlItems.Count - 1)
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

        //if (action == "insert")
        //{
        //    var fldnames = new StringBuilder();
        //    var flddatas = new StringBuilder();
        //    foreach (SqlInput item in SqlInputs)
        //    {
        //        fldnames.Append(item.fldname);
        //        fldnames.Append(',');

        //        flddatas.Append('\'');
        //        flddatas.Append(item.flddata);
        //        flddatas.Append('\'');
        //        flddatas.Append(',');
        //    }
        //    string resultFldnames = fldnames.ToString().Trim();
        //    string resultFlddatas = flddatas.ToString().Trim();
        //    var sqlString = $"insert into {table} ({resultFldnames}) values ({resultFlddatas})";
        //    return sqlString;
        //}
        //else if (action == "update")
        //{
        //    var updateStatement = new StringBuilder();
        //    foreach (SqlInput item in SqlInputs)
        //    {
        //        updateStatement.Append(item.fldname);
        //        updateStatement.Append('=');

        //        updateStatement.Append(item.flddata);
        //        updateStatement.Append(',');
        //    }
        //    string result = updateStatement.ToString().Trim();
        //    var sqlString = $"update {table} set {result} where {id}";
        //    return sqlString;
        //}
        //else if (action == "delete")
        //{
        //    var sqlString = $"delete from {table} where {id}";
        //    return sqlString;
        //}
        //else
        //{
        //    Console.WriteLine("Invalid");
        //    return "";
        //}
    }
}
