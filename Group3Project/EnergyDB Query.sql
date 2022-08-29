--CREATE TABLE BuiltPlants(--	Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,--	FuelType NVARCHAR(255) FOREIGN KEY REFERENCES PlantProps(FuelType),--	nameplateCapacity INT,--	RampRate INT,--	PowState BIT--);

--CREATE TABLE PlantProps(
--	FuelType NVARCHAR(255),
--	RampRate INT,
--	CO2perMW FLOAT,
--	AvgPlantSize INT,

--);

--SELECT * FROM BuiltPlants;

--SELECT * FROM PlantProps;

ALTER TABLE PlantProps
DROP COLUMN AvgPlantSize, CO2perMW;
--ADD minCapacity INT, maxCapacity INT;

--INSERT INTO PlantProps(FuelType, RampRate, CO2perMW, AvgPlantSize, minCapacity, maxCapacity)
--VALUES('Nuclear', , , ,30,1600),
--(),
