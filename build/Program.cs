var files = System.IO.Directory.GetFiles("../raw", "?.png", SearchOption.AllDirectories);

var images = new Dictionary<char, List<string>>() {
    {' ', new List<string>() {"../raw/_SYS/SPACE.png"}},
};

var reuse_chars = new (char, char)[] {
    ('＼', '\\'),
    ('／', '/'),
    ('：', ':'),
    ('＊', '*'),
    ('？', '?'),
    ('”', '"'),
    ('｜', '|'),
    ('＞', '>'),
    ('＜', '<'),
};

foreach (var i in files)
{
    char chr = i.Substring(i.Length - 5, 1)[0];
    if (!images.ContainsKey(chr))
        images.Add(chr, new List<string>());

    images[chr].Add(i);
}

Console.WriteLine("Converting to Bitmap");
foreach (var i in images)
{
    string dest = Methods.DestConv(i.Key);
    var psi = new System.Diagnostics.ProcessStartInfo("./convert2bmp.sh", $"\"{i.Value[0]}\" \"{dest}\"");
    var p = System.Diagnostics.Process.Start(psi);
    p.WaitForExit();
}

Console.WriteLine("Converting to SVG");
{
    var psi = new System.Diagnostics.ProcessStartInfo("./convert2svg.sh");
    var p = System.Diagnostics.Process.Start(psi);
    p.WaitForExit();
}

Dictionary<char, string> useImages = images.ToDictionary(v => v.Key, v => Methods.DestConv(v.Key));

useImages.Add('\r', "_EMPTY");
useImages.Add('\n', "_EMPTY");

foreach (var reuse_char in reuse_chars)
{
    Methods.UseSameimage(reuse_char.Item1, reuse_char.Item2, ref useImages);
}

List<string> import_json = new List<string>();
foreach (var i in useImages)
{
    int char_int = Convert.ToInt32(i.Key);
    string char_hex = $"0x{char_int:X}";
    import_json.Add($"\"{char_hex}\":{{\"src\":\"{i.Value}.svg\"}}");
}

string template_meta = File.ReadAllText("_template_metadata.json", System.Text.Encoding.UTF8)
    .Replace("/*GLYPHS*/", string.Join(",", import_json));

File.WriteAllText("metadata.json", template_meta, new System.Text.UTF8Encoding(false));