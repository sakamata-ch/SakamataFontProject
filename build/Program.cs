var orig_files = ChartGenerator.CGProg.GetImages();
Dictionary<char, List<string>> images = orig_files.ToDictionary(c => c.Key, f => f.Value.Select(i => i.Item1).ToList());
var file_source = ChartGenerator.CGProg.GenSourceList(orig_files, false);

// Add SPACE to the list of characters
images.Add(' ', new List<string>() { "../raw/_SYS/SPACE.png" });

// These chars can use same image.
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
    .Replace("/*GLYPHS*/", string.Join(",", import_json))
    .Replace("/*FILENAME*/", "sakamata-v1");

File.WriteAllText("metadata.json", template_meta, new System.Text.UTF8Encoding(false));

File.WriteAllLines("sakamata-v1.sources.tsv", file_source, System.Text.Encoding.UTF8);