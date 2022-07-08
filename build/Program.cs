var files = System.IO.Directory.GetFiles("../raw", "?.png", SearchOption.AllDirectories);

var images = new SortedDictionary<char, List<string>>();

foreach (var i in files)
{
    char chr = i.Substring(i.Length - 5, 1)[0];
    if (!images.ContainsKey(chr))
        images.Add(chr, new List<string>());

    images[chr].Add(i);
}

System.Console.WriteLine("Converting to Bitmap");
foreach (var i in images)
{
    var psi = new System.Diagnostics.ProcessStartInfo("./convert2bmp.sh", $"\"{i.Value[0]}\" {i.Key}");
    var p = System.Diagnostics.Process.Start(psi);
    p.WaitForExit();
}

System.Console.WriteLine("Converting to SVG");
{
    var psi = new System.Diagnostics.ProcessStartInfo("./convert2svg.sh");
    var p = System.Diagnostics.Process.Start(psi);
    p.WaitForExit();
}

List<string> import_json = new List<string>();
foreach (var i in images)
{
    int char_int = Convert.ToInt32(i.Key);
    string char_hex = $"0x{char_int:X}";
    import_json.Add($"\"{char_hex}\":{{\"src\":\"{i.Key}.svg\"}}");
}

string template_meta = File.ReadAllText("_template_metadata.json", System.Text.Encoding.UTF8)
    .Replace("/*GLYPHS*/", string.Join(",", import_json));

File.WriteAllText("metadata.json", template_meta, new System.Text.UTF8Encoding(false));