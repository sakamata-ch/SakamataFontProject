using Mono.Options;

namespace ChartGenerator
{
    public class FilterOption
    {
        public static (FilterOption, string[]) GetOptionsFromArgs(string[] args, IEnumerable<Option>? additionalOpts = null)
        {
            var toret = new FilterOption();
            var p = new OptionSet()
            {
                { "h|help", "Show this help and exit", v => toret.Help = v != null },
                { "s|strict", "Do not use another weight font in case not available", v => toret.NoAlt = v != null },
                { "nostrict", "Use another weight font in case not available (default)", v => toret.NoAlt = !(v != null) },
                { "w|weight=", "Font weight", (int v) => toret.Weight = v },
                { "rawdir=", "Original png Directory", v => toret.RawDir = v },
            };

            if (additionalOpts != null)
                foreach (var o in additionalOpts)
                    p.Add(o);

            var left_opt = p.Parse(args).ToArray();
            return (toret, left_opt);
        }

        public bool Help { get; set; }

        public bool NoAlt { get; set; }

        public int Weight { get; set; }

        public string? RawDir { get; set; } = null;
    }
}