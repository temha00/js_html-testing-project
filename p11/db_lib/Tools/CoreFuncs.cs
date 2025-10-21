using System.Linq.Expressions;

namespace db_lib.Tools
{
    public static class CoreFuncs
    {
        public static string GetMemberName<T>(Expression<Func<T, object>> expr)
        {
            if (expr.Body is MemberExpression member)
                return member.Member.Name;

            if (expr.Body is UnaryExpression unary && unary.Operand is MemberExpression member2)
                return member2.Member.Name;

            throw new InvalidOperationException("Invalid expression");
        }
    }
}
