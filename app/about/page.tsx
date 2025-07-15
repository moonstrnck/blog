import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[1fr_240px] gap-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">About</h2>
          <div className="space-y-4">
            {/* 블로그 카드 반복 */}
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>블로그 제목 {i}</CardTitle>
                  <CardDescription>
                    이것은 블로그 포스트에 대한 간단한 설명입니다. 여러 줄의 텍스트가 있을 수
                    있습니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <aside className="h-full">dd</aside>
      </div>
    </div>
  );
}
