package at.htlkaindorf.ex0004.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Train {
    private int id;
    private ArrayList<String> stations;
    private String type;

    public void addStation(String station) { stations.add(station); }
}
