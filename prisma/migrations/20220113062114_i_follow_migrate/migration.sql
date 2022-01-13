-- CreateTable
CREATE TABLE "__FollowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__FollowRelation_AB_unique" ON "__FollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "__FollowRelation_B_index" ON "__FollowRelation"("B");

-- AddForeignKey
ALTER TABLE "__FollowRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__FollowRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
