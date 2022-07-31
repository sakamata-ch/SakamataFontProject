if (args.Length != 1 || !System.IO.File.Exists(args[0]))
{
    Console.WriteLine("No File Found");
    Environment.Exit(1);
}

List<string> sources = new();

foreach (var l in System.IO.File.ReadAllLines(args[0], System.Text.Encoding.UTF8))
{
    var lc = l.Split('\t');
    if (lc.Length < 2 || lc[1] == "NO DATA")
        continue;

    if (!sources.Contains(lc[1]))
        sources.Add(lc[1]);
}

sources.Sort();

DateTime time_asia_tokyo = DateTime.UtcNow + TimeSpan.FromHours(9);

string pre = $@"このリリースは{time_asia_tokyo.ToString("yyyy/MM/dd HH:mm:ss")} JST時点のデータを利用したものです。安定版ではありません。

下記で利用された文字を収録しています。";

string post = $@"文字ごとの元配信一覧は`<フォント名>.sources.tsv`ファイルに記録されています。

まず試してみるという用途であれば`sakamata-font-0-nostrict.ttf`をご利用ください。

このプロジェクトは[ホロライブ二次創作ガイドライン](https://www.hololive.tv/terms)に準拠して実施されています。
成果物は[ホロライブ二次創作ガイドライン](https://www.hololive.tv/terms)の範囲内でのみ利用できます。";

string list = string.Empty;

foreach (var s in sources)
{
    list += $"- {s}{Environment.NewLine}";
}

string message = $@"{pre}{Environment.NewLine}{list}{Environment.NewLine}{post}";

System.IO.File.WriteAllText("message.md", message, System.Text.Encoding.UTF8);