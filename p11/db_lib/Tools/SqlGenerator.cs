using System.Linq.Expressions;
using System.Text;

namespace db_lib.Tools;

public class SqlGenerator<T>
{
    private string _tableName;

    public SqlGenerator()
    {
        this._tableName = typeof(T).Name;
    }

    List<object> items = new List<object>();

    public class item
    {
        public string? fldname;
        public string? flddata;
    }

    public void Add(Expression<Func<T, object>> fldExp, string flddata)
    {
        var fldname = CoreFuncs.GetMemberName(fldExp);

        var item = new item();
        item.fldname = fldname;
        item.flddata = flddata;
        items.Add(item);
    }

    public void Add(Expression<Func<T, object>> fldExp, DateTime? flddata)
    {
        var fldname = CoreFuncs.GetMemberName(fldExp);

        var item = new item();
        item.fldname = fldname;
        item.flddata = flddata.ToString();
        items.Add(item);
    }

    public string GetInsertSql()
    {
        var fldnames = new StringBuilder();
        var flddatas = new StringBuilder();
        var i = 0;

        foreach (item item in items)
        {
            fldnames.Append($"[{item.fldname}]");

            flddatas.Append($"\'{item.flddata}\'");

            if (i < items.Count - 1)
            {
                fldnames.Append(',');
                flddatas.Append(',');
            }

            i++;
        }

        var resultFldnames = fldnames.ToString();
        var resultFlddatas = flddatas.ToString();

        var sqlString = $"insert into {this._tableName} ({resultFldnames}) values ({resultFlddatas})";
        return sqlString;
    }

    public string GetUpdateSql(int id)
    {
        var updateString = new StringBuilder();
        var i = 0;

        foreach(item item in items)
        {
            updateString.Append($"[{item.fldname}] = \'{item.flddata}\'");

            if (i < items.Count - 1)
            {
                updateString.Append(',');
            }

            i++;
        }

        var resultString = updateString.ToString();
        var sqlString = $"update {this._tableName} set {resultString} where pk_id = {id}";

        return sqlString;
    }

    public string GetDeleteSql(int id)
    {
        var sqlString = $"delete from {this._tableName} where pk_id = {id}";
        return sqlString;
    }
}
