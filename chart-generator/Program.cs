using System.IO;
using System.Text.RegularExpressions;

using YamlDotNet.Serialization;

namespace ChartGenerator
{
    public class CGProg
    {
        static void Main(string[] args)
        {
            var images = GetImages(args);

            var char_tsv_output = new List<string>();
            var char_src_output = new List<string>();

            foreach (var i in images)
            {
                char_tsv_output.Add($"{i.Key}\t{i.Value.Count}");
                char_src_output.Add($"{i.Key}\t{string.Join('\t', i.Value.Select(v => v.Item1))}");
            }

            System.IO.File.WriteAllLines("output/char.tsv", char_tsv_output, System.Text.Encoding.UTF8);
            System.IO.File.WriteAllLines("output/file.tsv", char_src_output, System.Text.Encoding.UTF8);
        }

        public static string[] GenSourceList(IDictionary<char, List<(string, string[])>> files, bool useFilename = false)
        {
            List<string> toret = new();

            foreach (var c in files)
            {
                var tgt = c.Value[0];
                string pkey = useFilename ? tgt.Item1 : c.Key.ToString();

                if (tgt.Item2.Length == 0)
                {
                    toret.Add($"{pkey}\tNO DATA");
                    continue;
                }

                toret.Add($"{pkey}\t{string.Join("\t", tgt.Item2)}");
            }

            return toret.ToArray();
        }


        public static SortedDictionary<char, List<(string, string[])>> GetImages(string[] args)
        {
            (FilterOption opt, _) = FilterOption.GetOptionsFromArgs(args);
            return GetImages(opt);
        }

        public static SortedDictionary<char, List<(string, string[])>> GetImages(FilterOption? opt = null)
        {
            if (opt == null)
                (opt, _) = FilterOption.GetOptionsFromArgs(new string[] { });

            string APPDIR = opt.RawDir ?? (Directory.Exists("../raw") ? "." : AppDomain.CurrentDomain.BaseDirectory);
            string RAWDIR = Path.Combine(APPDIR, "..", "raw");

            var files = System.IO.Directory.GetFiles(RAWDIR, (opt.NoAlt && opt.Weight == 0) ? "?.png" : "*.png", SearchOption.AllDirectories);

            if (opt.NoAlt && opt.Weight != 0)
                files = files.Where(x => Regex.IsMatch(x, @"[/\\](\[(" + opt.Weight.ToString() + @")\]).\.png$", RegexOptions.IgnoreCase)).ToArray();
            else
                files = files.Where(x => Regex.IsMatch(x, @"[/\\](\[(\d{3})\])*.\.png$", RegexOptions.IgnoreCase)).ToArray();

            var images = new SortedDictionary<char, List<(string, string[])>>();

            var ymldes = new Deserializer();

            foreach (var i in files)
            {
                string no_rel_path = i.Substring(RAWDIR.Length + 1);
                string container_dir = no_rel_path.Replace('\\', '/').Split('/')[0];
                string src_file = Path.Combine(RAWDIR, container_dir, "source.yml");

                List<string> source_info_list = new();

                if (System.IO.File.Exists(src_file))
                {
                    using (var srcyml = new StreamReader(src_file, System.Text.Encoding.UTF8))
                    {
                        var si = ymldes.Deserialize<Source>(srcyml);

                        if (si.Url != null)
                            source_info_list.Add(si.Url);

                        if (si.AuthorUrl != null)
                            source_info_list.Add(si.AuthorUrl);
                    }
                }

                char chr = i.Substring(i.Length - 5, 1)[0];
                if (!images.ContainsKey(chr))
                    images.Add(chr, new List<(string, string[])>());

                images[chr].Add((i, source_info_list.ToArray()));
            }

            return images;
        }
    }
}