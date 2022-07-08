var files = System.IO.Directory.GetFiles("../raw", "?.png", SearchOption.AllDirectories);

var images = new SortedDictionary<char, List<string>>();

foreach (var i in files)
{
    char chr = i.Substring(i.Length - 5, 1)[0];
    if (!images.ContainsKey(chr))
        images.Add(chr, new List<string>());

    images[chr].Add(i);
}

var char_tsv_output = new List<string>();
var char_file_tsv_output = new List<string>();

foreach (var i in images)
{
    char_tsv_output.Add($"{i.Key}\t{i.Value.Count}");
    char_file_tsv_output.Add($"{i.Key}\t{i.Value[0].Substring(7)}");
}

System.IO.File.WriteAllLines("output/char.tsv", char_tsv_output, System.Text.Encoding.UTF8);
System.IO.File.WriteAllLines("output/file.tsv", char_file_tsv_output, System.Text.Encoding.UTF8);