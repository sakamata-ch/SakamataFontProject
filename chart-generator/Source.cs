using YamlDotNet.Serialization;

namespace ChartGenerator
{
    internal class Source
    {
        [YamlMember(Alias = "url")]
        public string? Url { get; set; } = null;

        [YamlMember(Alias = "author_url")]
        public string? AuthorUrl { get; set; } = null;

        [YamlMember(Alias = "notes")]
        public string? Notes { get; set; } = null;
    }
}