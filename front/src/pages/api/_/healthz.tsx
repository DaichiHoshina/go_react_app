export default function handler(
  req: any,
  res: {
    statusCode: number;
    setHeader: (arg0: string, arg1: string) => void;
    end: (arg0: string) => void;
  }
) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "ok" }));
}
