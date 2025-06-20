import { Card, CardContent } from "../ui/card";

const AmountTotal = () => {
  return (
    <Card className="flex flex-row gap-4 p-1">
      <CardContent>
        <p>Total Income: $1000</p>
      </CardContent>
      <CardContent>
        <p>Total Expenditure:: $1000</p>
      </CardContent>
    </Card>
  );
};

export default AmountTotal;
