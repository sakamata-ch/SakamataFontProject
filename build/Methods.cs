using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

internal static class Methods
{
    public static void UseSameimage(char ref_c, char new_c, ref Dictionary<char, string> db)
    {
        if (!db.ContainsKey(ref_c)) return;
        if (db.ContainsKey(new_c)) return;

        db.Add(new_c, db[ref_c]);
    }
}
