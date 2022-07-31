using System.IO;

(ChartGenerator.FilterOption opt, args) = ChartGenerator.FilterOption.GetOptionsFromArgs(args);

string o_fname = "sakamata-v1";

var opts = new Mono.Options.OptionSet()
{
    { "f|filename=", "Output file name (without extension)", v => o_fname = v },
};
opts.Parse(args);

var orig_files = ChartGenerator.CGProg.GetImages(opt);
Dictionary<char, List<string>> images = orig_files.ToDictionary(c => c.Key, f => f.Value.Select(i => i.Item1).ToList());
var file_source = ChartGenerator.CGProg.GenSourceList(orig_files, false);

string APPDIR = AppDomain.CurrentDomain.BaseDirectory;
string RAWDIR = opt.RawDir ?? APPDIR;

// Ready workspace
{
    if (Directory.Exists("workdir"))
        Directory.Delete("workdir", true);
    Directory.CreateDirectory("workdir");

    File.Copy(Path.Combine(APPDIR, "_EMPTY.svg"), "workdir/_EMPTY.svg");
}


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
    string from = Path.Combine(RAWDIR, i.Value[0]);
    var psi = new System.Diagnostics.ProcessStartInfo("convert", $"\"{from}\" -background white -alpha remove -alpha off -depth 8 -type Grayscale \"workdir/{dest}.bmp\"");
    var p = System.Diagnostics.Process.Start(psi);
    p.WaitForExit();
    if (p.ExitCode != 0)
    {
        Console.Error.WriteLine($"Failed to convert \"{from}\" to \"workdir/{dest}.bmp\"");
        Environment.Exit(1);
    }
}

Console.WriteLine("Converting to SVG");
{
    var p = System.Diagnostics.Process.Start("sh", "-c \"potrace -s workdir/*.bmp\"");
    p.WaitForExit();
    if (p.ExitCode != 0)
    {
        Console.Error.WriteLine("Failed to convert to SVG");
        Environment.Exit(1);
    }
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

string template_meta = File.ReadAllText(Path.Combine(APPDIR, "_template_metadata.json"), System.Text.Encoding.UTF8)
    .Replace("/*GLYPHS*/", string.Join(",", import_json))
    .Replace("/*FILENAME*/", o_fname);

File.WriteAllText(o_fname + ".metadata.json", template_meta, new System.Text.UTF8Encoding(false));

System.Diagnostics.Process.Start(Path.Combine(APPDIR, "svgs2ttf/svgs2ttf"), o_fname + "\".metadata.json\"").WaitForExit();

File.WriteAllLines(o_fname + ".sources.tsv", file_source, System.Text.Encoding.UTF8);